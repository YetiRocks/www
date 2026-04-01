import { createFileRoute } from '@tanstack/react-router'
import CookiePolicy from '../../pages/legal/CookiePolicy'

export const Route = createFileRoute('/legal/cookie-policy')({
  component: CookiePolicy,
})
