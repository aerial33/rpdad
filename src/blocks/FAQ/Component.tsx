'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { useState } from 'react'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import RichText from '@/components/RichText'
import { FAQCollapse } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { FAQBlock as FAQBlockType } from '@/payload-types'

export const FAQBlock = ({ badge, title, subtitle, bgColor, items }: FAQBlockType) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  if (!items || items.length === 0) return null

  return (
    <section className="relative py-20 lg:py-32">
      <BackgroundSection className={bgColor || 'bg-white'} />
      <div className="container mx-auto px-4 xl:flex xl:justify-between xl:gap-8 xl:px-0">
        <div className="mb-16 text-center xl:text-left">
          {badge && (
            <Badge className="mb-4 border-gray-600" variant="outline">
              {badge}
            </Badge>
          )}
          {title && (
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-muted-foreground mx-auto max-w-lg text-lg">{subtitle}</p>}
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {items.map((faq, index) => {
              const isOpen = openItems.includes(index)
              return (
                <Card
                  key={index}
                  className="border-muted-foreground border-0 border-b bg-transparent shadow-sm transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="hover:bg-muted/20 group w-full p-6 text-left transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`pr-8 text-lg font-semibold transition-colors duration-200 ${
                            isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}
                        >
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                              isOpen
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-primary'
                            }`}
                          />
                        </motion.div>
                      </div>
                    </button>
                    <FAQCollapse isOpen={isOpen} duration={0.3}>
                      <div className="px-6 pb-6">
                        <motion.div
                          initial={false}
                          animate={{ opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.2, delay: isOpen ? 0.15 : 0 }}
                          className="text-muted-foreground border-t pt-4 leading-relaxed"
                        >
                          <RichText data={faq.answer} />
                        </motion.div>
                      </div>
                    </FAQCollapse>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
