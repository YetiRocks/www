import { createFileRoute } from '@tanstack/react-router'
import Demos from '../../pages/Demos'

export const Route = createFileRoute('/developers/demos')({
  component: Demos,
})
