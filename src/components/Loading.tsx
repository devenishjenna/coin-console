import PageContainer from "./PageContainer";

// shown while a page waits on the api
export default function Loading() {
  return (
    <PageContainer>
      <p className="text-gray-500 text-xl">Loading...</p>
    </PageContainer>
  );
}
