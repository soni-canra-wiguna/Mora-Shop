import { Github } from "lucide-react"
import { Container } from "./layout/container"

export const Footer = () => {
  return (
    <footer>
      <Container className="flex items-center justify-between pb-8 pt-12">
        <span>
          &copy; 2024 mora shop by{" "}
          <span className="font-semibold capitalize text-main">
            soni canra wiguna
          </span>
        </span>
        <a href="https://github.com/soni-canra-wiguna" target="_blank">
          <Github className="size-6 stroke-[1.5]" />
        </a>
      </Container>
    </footer>
  )
}
