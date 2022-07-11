import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IApiDataProps, IUserInfo } from '../../ts_ui';

interface IEmployeesDbContextProps {
  employees: IUserInfo[];
  setEmployees: Dispatch<SetStateAction<IUserInfo[]>>;
  isLoading: boolean;
}

interface IEmployeesDbContextProviderProps {
  children: ReactNode;
}

const EmployeesDbContext = createContext({} as IEmployeesDbContextProps);

const EmployeesDbContextProvider = ({
  children,
}: IEmployeesDbContextProviderProps) => {
  const [employees, setEmployees] = useState<IUserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* CSR */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/feedback');
        if (!response.ok) {
          console.log('Something Went Wrong: Possible Server Error');
        }
        const data: IApiDataProps = await response.json();
        const { data: dataFromApi } = data;
        setEmployees(dataFromApi);
      } catch (error: any) {
        console.log('Network Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <EmployeesDbContext.Provider
      value={{
        employees,
        setEmployees,
        isLoading,
      }}
    >
      {children}
    </EmployeesDbContext.Provider>
  );
};

const useEmployeesDbContext = () => useContext(EmployeesDbContext);

export { EmployeesDbContextProvider, useEmployeesDbContext };
