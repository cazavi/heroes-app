import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate= jest.fn();

jest.mock("react-router-dom", () =>({
  ...jest.requireActual("react-router-dom"),
  useNavigate: ()=> mockedUseNavigate,
}));

describe('Pruebas en <Navbar/>', () => {
  
  const contextValue ={
    logged: true,
    user:{
      name: 'Juan Carlos'
    },
    logout: jest.fn()
  }

  beforeEach(()=> jest.clearAllMocks());

  test('debe de mostrar el nombre del usuario', () => {
    
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Juan Carlos')).toBeTruthy();
  });

  test('debe de llamar el logout y navigate al onClick', () => {
    
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
  });
});