import styled from 'styled-components';
import { ContentWrapper } from '../../../styles/utils/ContentWrapper';

export const FeedbackPageWrapper = styled.div`
  ${ContentWrapper}
  display: flex;
  flex-direction: column;
  gap: var(--gap-lg);

  h1 {
    text-align: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    li {
      border: 1px solid ${({ theme }) => theme.textColor};
      padding: 2rem;
      border-radius: var(--radius-md);
      display: grid;
      grid-template-columns: 1fr 3fr 3fr 1fr 2fr 1fr;
      align-items: center;
      gap: var(--gap-md);
      /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
    }
  }
`;

export const GoToDetailsButton = styled.button`
  background-color: transparent;
  border: 1px solid blueviolet;
  border-radius: 7px;
  padding: 0.3rem 0.5rem;
  height: 3.5rem;
`;
export const DeleteButton = styled.button`
  background-color: transparent;
  color: red;
  border: 1px solid red;
  height: 3.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
