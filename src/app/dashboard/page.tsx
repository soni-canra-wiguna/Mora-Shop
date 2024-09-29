import { Container } from "@/components/layout/container"
import { ProductView } from "@/components/product/product-view"
import { CreateProductForm } from "@/components/product/create-product-form"

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full">
      <Container>
        <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
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
