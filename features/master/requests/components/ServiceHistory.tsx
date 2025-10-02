import React, { FC } from 'react'
import { Text } from 'react-native'

import BaseAccordion from '@/components/ui/accordion/BaseAccordion'

type ServiceHistoryProps = {
  request: any
  value?:string
}

const ServiceHistory: FC<ServiceHistoryProps> = ({ request, value }) => {
  return (
    <BaseAccordion title='История обслуживания' icon='clock' value={value}>
      {request.history.map((item:any, i:number) => (
        <Text key={i}>{item.date}</Text>
      ))}
    </BaseAccordion>
  )
}

export default ServiceHistory
