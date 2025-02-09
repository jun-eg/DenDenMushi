export default async function Home() {
  const res = await fetch("http://host.docker.internal:5000/item");
  const data = await res.json();
  return (
    <>
      <div>
        {data.map((item: { id: string; body: string }) => (
          <li key={item.id}>{item.body}</li>
        ))}
      </div>
    </>
  );
}
