import { Feather } from '@expo/vector-icons'
import cn from 'clsx'
import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'

import {
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/icon'

import { TypeFeatherIconNames } from '@/types/types'

type BaseAccordionProps = {
  title: string
  children: ReactNode
  icon: TypeFeatherIconNames
  value?: string
}

const BaseAccordion: FC<BaseAccordionProps> = ({
  title,
  children,
  icon,
  value
}) => {
  return (
    <AccordionItem value={value ?? 'default'} className='rounded-2xl px-4 py-1'>
      <AccordionTrigger className='pb-3 p-0'>
        {({ isExpanded }: { isExpanded: any }) => {
          return (
            <AccordionHeader
              className={cn(
                'w-full flex-row justify-between py-3 border-b ',
                isExpanded ? 'border-grayLight' : 'border-white'
              )}
            >
              <View className='flex-row gap-2 items-center'>
                <Feather name={icon} size={22} style={{ color: '#15803d' }} />
                <AccordionTitleText className='text-primary uppercase ml-2'>
                  {title}
                </AccordionTitleText>
              </View>
              {isExpanded ? (
                <AccordionIcon
                  as={ChevronUpIcon}
                  className='mr-2 right-4 top-1'
                />
              ) : (
                <AccordionIcon
                  as={ChevronDownIcon}
                  className='mr-2 right-4 top-1'
                />
              )}
            </AccordionHeader>
          )
        }}
      </AccordionTrigger>
      <AccordionContent className='p-1 py-3'>
        <AccordionContentText className=''>
          <View className='gap-3 '>
            {children}
          </View>
        </AccordionContentText>
      </AccordionContent>
    </AccordionItem>
  )
}

export default BaseAccordion
