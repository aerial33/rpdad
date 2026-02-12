'use client'

import Image from 'next/image'
import { Quote } from 'lucide-react'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { MySlider } from '@/components/Slider'
import { FadeUp } from '@/components/motion/animations'
import { Card, CardContent } from '@/components/ui/card'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'

export const TestimonialsBlock = ({
  title,
  subtitle,
  testimonials,
  bgColor,
}: TestimonialsBlockType) => {
  return (
    <section className="relative py-20 lg:py-32">
      <BackgroundSection className={bgColor || 'bg-white'} />
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <FadeUp delay={0.2} className="mb-16 text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{subtitle}</p>
            )}
          </FadeUp>
        )}

        {testimonials && testimonials.length > 0 && (
          <FadeUp delay={0.3}>
            <MySlider
              data={testimonials}
              itemPerRow={1}
              className="mx-auto max-w-7xl"
              arrowBtnClass="top-1/2 -translate-y-1/2"
              renderItem={(testimonial) => {
                const avatarUrl =
                  testimonial.avatar &&
                  typeof testimonial.avatar === 'object' &&
                  'url' in testimonial.avatar
                    ? testimonial.avatar.url
                    : null

                return (
                  <Card className="mx-auto max-w-3xl rounded-3xl border-0 bg-white/80 shadow-sm transition-shadow hover:shadow-xl">
                    <CardContent className="p-8">
                      <Quote className="text-primary-dark mb-4 h-8 w-8" />
                      <blockquote className="mb-6 text-center text-lg leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                      <div className="flex items-center justify-end gap-3">
                        {avatarUrl && (
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={avatarUrl}
                              alt={testimonial.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          {(testimonial.age || testimonial.role) && (
                            <p className="text-muted-foreground text-sm">
                              {testimonial.age && `${testimonial.age} ans`}
                              {testimonial.age && testimonial.role && ' • '}
                              {testimonial.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              }}
            />
          </FadeUp>
        )}
      </div>
    </section>
  )
}
