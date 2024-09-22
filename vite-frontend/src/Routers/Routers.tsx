import { createHashRouter } from "react-router-dom";
import App from "../App";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashflowStatement from "../Components/CashflowStatement/CashflowStatement";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import HistoricalDividend from "../Components/HistoricalDividend/HistoricalDividend";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import DesignGuide from "../Pages/DesignGuide/DesignGuide";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProctectedRoute from "./ProctectedRoute";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "design-guide", element: <DesignGuide /> },
            {
                path: "search",
                element: (
                    <ProctectedRoute>
                        <SearchPage />
                    </ProctectedRoute>
                ),
            },
            {
                path: "company/:ticker",
                element: (
                    <ProctectedRoute>
                        <CompanyPage />,
                    </ProctectedRoute>
                ), 
                children: [
                    { path: "company-profile", element: <CompanyProfile /> },
                    { path: "income-statement", element: <IncomeStatement /> },
                    { path: "balance-sheet", element: <BalanceSheet /> },
                    { path: "cashflow-statement", element: <CashflowStatement /> },
                    { path: "historical-dividend", element: <HistoricalDividend /> },
                ]
            }
        ],
    },
],
);