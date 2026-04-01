import { createFileRoute } from '@tanstack/react-router'
import Benchmarks from '../../pages/Benchmarks'

export const Route = createFileRoute('/developers/benchmarks')({
  component: Benchmarks,
})
