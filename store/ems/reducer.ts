import { EModalComponent, EModalToggleState } from '../../ts_ui';
import { Actions, EActions } from './actions';
import { IEmsAppState } from './EmsContext';

export const emsReducer = (state: IEmsAppState, action: Actions): IEmsAppState => {
  switch (action.type) {
    case EActions.Loading: {
      return { ...state, loading: true };
    }

    case EActions.FetchEmployees: {
      return { ...state, employees: action.payload, loading: false };
    }

    case EActions.ModalActive: {
      if (
        action.payload.toggleState === EModalToggleState.show &&
        action.payload.component === EModalComponent.createUserForm
      ) {
        return { ...state, modalActive: true, createUserFormActive: true };
      }
      if (
        action.payload.toggleState === EModalToggleState.show &&
        action.payload.component === EModalComponent.confirmDeleteBox
      ) {
        return { ...state, modalActive: true, confirmDeleteBoxActive: true };
      }
      return {
        ...state,
        modalActive: false,
        confirmDeleteBoxActive: false,
        createUserFormActive: false,
      };
    }

    case EActions.UpdateEmployees: {
      return { ...state, employees: action.payload };
    }

    case EActions.UniqueUserId: {
      return { ...state, uniqueUserId: action.payload };
    }

    case EActions.DeleteEmployee: {
      const newData = state.employees.filter(employee => employee.id !== state.uniqueUserId);
      return { ...state, employees: newData };
    }

    default: {
      throw new Error('action not found.');
    }
  }
};
