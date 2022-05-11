import Head from 'next/head';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { v4 as createId } from 'uuid';
import { toast } from 'react-toastify';
import { addNewClient, addNewInvoice } from '../../../services/firebase';

import { Select } from '../../../components/Form/Select';
import { Title } from '../../../components/Form/Title';
import { Input } from '../../../components/Form/Input';
import { Header } from '../../../components/Header';

import { 
  FormControl, 
  Footer 
} from '../../../styles/pages/Dashboard';
import { Main } from '../../../styles/Common';
import { useClient } from '../../../hooks/useClient';

export default function CreateInvoice() {
  const generateIdInvoice = createId();
  const { clientList, collaboratorList } = useClient();

  async function handleSubmitNewInvoice(data: DataInvoiceProps, { reset }) {
    try {
      const schema = Yup.object().shape({
        client: Yup.string()
          .required('Por favor selecione um cliente'),
        moneyValue: Yup.string()
          .required('Preencha o campo do valor da fatura'),
        maxDueDate: Yup.string()
          .required('Preencha o campo da data máxima de vencimento'),
        collaborator: Yup.string()
          .required('Selecione um colaborador para essa fatura'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const dateCurrent = new Date();

      addNewInvoice(
        data.id,
        data.client,
        data.maxDueDate,
        data.moneyValue,
        data.collaborator,
        dateCurrent.toString(),
        data.description
      );
      reset();
      toast.success('Fatura adicionada com sucesso 🚀');
    } catch (err) {
      err.inner.forEach(error => {
        const errors = error.message;
        toast.error(errors);
      })
    }
  }

  return (
    <>
      <Head>
        <title>Gere uma fatura | Alpha desenvolvimento</title>
      </Head>

      <Header title="Gere as faturas de forma rápida por meio do sistema" description="O primeiro passo é completar todos os campos com os dados corretos" />
      <Main>    
        <Form onSubmit={handleSubmitNewInvoice}>          
          <FormControl>
            <fieldset>
              <Title title="Dados da fatura" />
              <Select name="client" label="Cliente">
                <option value="" disabled selected>Selecionar um cliente</option>
                {clientList.map(item => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </Select>
              <Input type="text" name="moneyValue" label="Valor da fatura" />
              <Input type="date" name="maxDueDate" label="Vencimento máximo" />
              <Input type="text" name="description" label="Observação" />
              <Input type="text" name="id" value={generateIdInvoice} label="Identificação da fatura" disabled />
            </fieldset>
            <fieldset>
              <Title title="Dados de cadastrante" />
              <Select name="collaborator" label="Colaborador(a)">
                <option value="" disabled selected>Selecionar um colaborador</option>
                {collaboratorList.map(item => (
                  <option key={item.id} value={item.name} >{item.name}</option>
                ))}
              </Select>
            </fieldset>
          </FormControl>
          <Footer>
            <button type="submit">
              Gerar fatura
            </button>
          </Footer>
        </Form>    
      </Main>

    </>
  );
}