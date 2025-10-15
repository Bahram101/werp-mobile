export type StatusText = 'assigned' | 'done' | 'total'

const map: Record<StatusText, string> = {
  assigned: 'text-red',
  done: 'text-blue',
  total: 'text-primary'
}

export const getStatusColor = (status: StatusText): string => {
  return map[status]
}
/****************************************************************** */
export const getStatusMeta = (status: number) => {
  switch (status) {
    case 1:
      return {
        label: 'Активная',
        text: 'text-primary',
        bgInner: 'bg-success-300',
        bgOuter: 'bg-success-50'
      }
    case 2:
      return {
        label: 'Срочная',
        text: 'text-error-400',
        bgInner: 'bg-error-400',
        bgOuter: 'bg-error-50'
      }
    default:
      return {}
  }
}

export const getPaymentLabel = (payment: string) => {
  switch (payment) {
    case '1':
      return 'Наличный'
    case '2':
      return 'Безналичный'
    default:
      return ''
  }
}
