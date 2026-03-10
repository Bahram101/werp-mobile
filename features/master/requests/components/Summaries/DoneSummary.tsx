import React from 'react'
import { Text, View } from 'react-native'

import { formatCurrency } from '@/utils/helpers'

const DoneSummary = () => {
  // const tenge = String.fromCharCode(0x20b8)
  return (
    <View className='bg-white p-4 rounded-2xl flex-col gap-3 mt-3'>
      <View className='border-b border-grayLight flex-row pb-3 gap-2'>
        <Text className='font-bold text-primaryDark'>ВЫПОЛНЕНО:</Text>
        <Text className='font-bold ml-2 text-primaryDark'>15 ЗАЯВОК</Text>
      </View>
      <View className='flex-row justify-between border-b border-grayLight pb-3'>
        <View className='flex-row'>
          <Text className='text-grayDark'>Картой: </Text>
          <Text className='font-bold'>{formatCurrency(62450)}</Text>
        </View>
        <View className='flex-row'> 
          <Text className='text-grayDark'>Наличнимы: </Text>
          <Text className='font-bold'>{formatCurrency(50486)}</Text>
        </View>
      </View>
      <View className='flex-row justify-between '>
        <Text></Text>
        <View className='flex-row'>
          <Text className='font-bold text-grayDark'>ИТОГО:</Text>
          <Text className='ml-2 font-bold text-primaryDark'>{formatCurrency(112486)}</Text>
        </View>
      </View>
    </View>
  )
}

export default DoneSummary
