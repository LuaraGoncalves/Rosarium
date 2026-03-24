import { createBrowserRouter } from "react-router";
import { NotFound } from "../features/erros/pages/NotFound";
import { ChurchHome } from "../features/home/pages/ChurchHome";
import { RosarioPage } from "../features/rosario/pages/RosarioPage";
import { NovenasPage } from "../features/novenas/pages/NovenasPage";
import { NovenaDetalhe } from "../features/novenas/pages/NovenaDetalhe";
import { NovenaDia } from "../features/novenas/pages/NovenaDia";
import { OracoesPage } from "../features/oracoes/pages/OracoesPage";
import { BreviarioPage } from "../features/breviario/pages/BreviarioPage";
import { LiturgiaPage } from "../features/liturgia/pages/LiturgiaPage";
import { LiturgiaHojePage } from "../features/liturgia/pages/LiturgiaHojePage";
import { CalendarioLiturgicoPage } from "../features/liturgia/pages/CalendarioLiturgicoPage";
import { SantosPage } from "../features/santos/pages/SantosPage";
import { SantoDetalhePage } from "../features/santos/pages/SantoDetalhePage";
import { BreviarioHoraPage } from "../features/breviario/pages/BreviarioHoraPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: ChurchHome,
    },
    {
        path: "/auth/login",
        Component: LoginPage,
    },
    {
        path: "/auth/register",
        Component: RegisterPage,
    },
    {
        path: "/igreja",
        Component: ChurchHome,
    },
    {
        path: "/rosario",
        Component: RosarioPage,
    },
    {
        path: "/novenas",
        Component: NovenasPage,
    },
    {
        path: "/novenas/:id",
        Component: NovenaDetalhe,
    },
    {
        path: "/novenas/:id/dia/:dia",
        Component: NovenaDia,
    },
    {
        path: "/oracoes",
        Component: OracoesPage,
    },
    {
        path: "/breviario",
        Component: BreviarioPage,
    },
    {
        path: "/breviario/:hora",
        Component: BreviarioHoraPage,
    },
    {
        path: "/liturgia",
        Component: LiturgiaPage,
    },
    {
        path: "/liturgia/hoje",
        Component: LiturgiaHojePage,
    },
    {
        path: "/liturgia/calendario",
        Component: CalendarioLiturgicoPage,
    },
    {
        path: "/santos",
        Component: SantosPage,
    },
    {
        path: "/santos/:id",
        Component: SantoDetalhePage,
    },
    {
        path: "*",
        Component: NotFound,
    },
]);
