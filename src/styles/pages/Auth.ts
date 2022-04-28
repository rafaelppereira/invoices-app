import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background-color: var(--gray-100);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 2rem;
`;

export const Box = styled.div`
  background-color: var(--white-100);

  width: 100%;
  max-width: 556px;
  height: 100%;
  max-height: 456px;

  border-radius: 1rem;

  padding: 3rem;
  margin-top: 1rem;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.div`
  text-align: center;

  h2 {
    font-size: 2.4rem;
    font-weight: 500;
    
    color: var(--alpha-secondary);
  }

  p {
    font-size: 1.1rem;
    font-weight: 300;

    color: var(--gray-300);

    margin-top: 0.3rem;
  }
`;

export const FormControl = styled.form`
  margin-top: 2rem;

  button {
    width: 100%;
    height: 50px;

    background-color: var(--alpha-primary);
    color: var(--white-100);

    margin-top: 2rem;
    border-radius: 10rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const Info = styled.div`
  font-size: 0.7rem;

  text-align: center;
  margin: 1.8rem 0;

  h3 {
    color: var(--gray-300);
    font-weight: 400;

    span {
      color: var(--alpha-primary);
    }
  }
`;