import { Container } from "@/components/layout/container"
import { ListProducts } from "@/components/list-products"

export default function Home() {
  return (
    <main className="flex min-h-screen w-full">
      <Container>
        <ListProducts />
      </Container>
    </main>
  )
}
