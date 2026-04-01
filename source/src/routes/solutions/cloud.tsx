import { createFileRoute } from '@tanstack/react-router'
import Hosting from '../../pages/Hosting'

export const Route = createFileRoute('/solutions/cloud')({
  component: Hosting,
})
