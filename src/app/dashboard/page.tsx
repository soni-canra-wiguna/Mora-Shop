import { Container } from "@/components/layout/container"
import { ProductView } from "@/components/product/product-view"
import { CreateProductForm } from "@/components/product/create-product-form"

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full">
      <Container>
        <div className="grid w-full grid-cols-2">
          <div className="">
            <CreateProductForm />
          </div>
          <div>
            <ProductView />
          </div>
        </div>
      </Container>
    </main>
  )
}
