import PageContainer from "./PageContainer";

// shown when an api request fails
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <PageContainer>
      <p className="text-red-700 border border-red-200 rounded-lg p-4">Error: {message}</p>
    </PageContainer>
  );
}
