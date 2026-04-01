import { createFileRoute } from '@tanstack/react-router'
import AcceptableUse from '../../pages/legal/AcceptableUse'

export const Route = createFileRoute('/legal/acceptable-use')({
  component: AcceptableUse,
})
