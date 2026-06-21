import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2, ArrowRight } from "lucide-react";

const DonateReturnPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="container mx-auto container-padding">
        <div className="max-w-xl mx-auto text-center">
          {sessionId ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-foreground text-background flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Thank you.
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Your generosity will reach a young person in Burundi who is ready to thrive.
              </p>
              <p className="text-sm text-muted-foreground mb-10 break-all">
                Reference: {sessionId}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90" asChild>
                  <Link to="/impact">
                    <Heart className="w-4 h-4 mr-2" />
                    See your impact
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">
                    Back to home
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
                No donation found
              </h1>
              <p className="text-muted-foreground mb-6">
                We couldn't find a recent donation session.
              </p>
              <Button asChild>
                <Link to="/donate">Return to donate page</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonateReturnPage;
