import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ImpactPage from "./pages/ImpactPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import ContactPage from "./pages/ContactPage";
import EducationPage from "./pages/programs/EducationPage";
import AgriculturePage from "./pages/programs/AgriculturePage";
import EntrepreneurshipPage from "./pages/programs/EntrepreneurshipPage";
import VocationalTrainingPage from "./pages/programs/VocationalTrainingPage";
import LeadershipPage from "./pages/programs/LeadershipPage";
import ApplyPage from "./pages/ApplyPage";
import VolunteerPage from "./pages/VolunteerPage";
import DonatePage from "./pages/DonatePage";
import DonateReturnPage from "./pages/DonateReturnPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/get-involved" element={<GetInvolvedPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/programs/education" element={<EducationPage />} />
              <Route path="/programs/agriculture" element={<AgriculturePage />} />
              <Route path="/programs/entrepreneurship" element={<EntrepreneurshipPage />} />
              <Route path="/programs/vocational-training" element={<VocationalTrainingPage />} />
              <Route path="/programs/leadership" element={<LeadershipPage />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/donate/return" element={<DonateReturnPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
