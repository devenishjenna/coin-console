import { Link, useLocation } from "react-router-dom";
import PageContainer from "./PageContainer";

// shown when an api request fails
// onRetry re-runs the failed request, so a rate limited page recovers in place
export default function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  // the dashboard is already at "/", so the link would be a no-op there
  const { pathname } = useLocation();

  return (
    <PageContainer>
      <div className="text-red-700 border border-red-200 rounded-lg p-4">
        <p>Error: {message}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {onRetry && (
            <button onClick={onRetry} className="text-sm border rounded-xl p-2">
              Try again
            </button>
          )}
          {pathname !== "/" && (
            <Link to="/" className="text-sm border rounded-xl p-2">
              Back to Dashboard
            </Link>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
