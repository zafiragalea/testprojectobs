import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import User from "../User";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../Redux/rootReducer";

const store = createStore(rootReducer);

test("renders User component", () => {
  render(
    <Provider store={store}>
      <User />
    </Provider>
  );

  expect(screen.getByText(/USER ACCOUNT/i)).toBeInTheDocument();
});
