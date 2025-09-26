import React from 'react'
import { Text, View } from 'react-native'

import { formatCurrency } from '@/utils/helpers'

type Props = {}

const FinishedSummary = (props: Props) => {
  return (
    <View className='p-5 bg-white mt-3 rounded-2xl flex-col gap-4 '>
      <View className='flex-row justify-center border-b border-grayLight pb-4 font-bold'>
        <Text className='font-bold text-grayDark'>ЗАВЕРЩЕНО: </Text>
        <Text className='font-bold'>717 ЗАЯВОК</Text>
      </View>
      <View className='flex-row justify-center'>
        <Text className='font-bold text-grayDark'>ПРЕМЯ: </Text>
        <Text className='font-bold'>{formatCurrency(675486)} </Text>
      </View>
    </View>
  )
}

export default FinishedSummary
