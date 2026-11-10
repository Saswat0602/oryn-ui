import React from 'react'
import { Badge } from '@oryn/ui'

interface StatusBadgeProps {
  status: 'stable' | 'beta' | 'alpha' | 'deprecated'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = (status: string) => {
    switch (status) {
      case 'stable':
        return 'default'
      case 'beta':
        return 'secondary'
      case 'alpha':
        return 'outline'
      case 'deprecated':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <Badge variant={getVariant(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
