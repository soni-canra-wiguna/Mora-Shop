import { Container } from "@/components/layout/container"
import { ListProducts } from "@/components/list-products"
import { CreateProductForm } from "@/components/product/create-product-form"

export default function Home() {
  return (
    <main className="flex min-h-screen w-full">
      <Container>
        {/* <ListProducts /> */}
        <CreateProductForm />
      </Container>
    </main>
  )
}
