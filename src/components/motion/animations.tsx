'use client'

import { motion } from 'framer-motion'

import { ReactNode, useState } from 'react'

import { cn } from '@/utilities/ui'

import { Button } from '@/components/ui/button'

export const Collapse = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mx-auto w-full max-w-7xl rounded-2xl border p-4 shadow-sm">
      <Button className="mx-auto flex w-fit" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          ▼
        </motion.span>
      </Button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4">{children}</div>
      </motion.div>
    </div>
  )
}

export const FadeUp = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  // let ref = useRef(null);
  // let isInView = useInView(ref);
  return (
    <motion.div
      // ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      // animate={isInView ? "visible" : "hidden"}
      transition={{ duration, ease: 'easeIn', delay: delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const FadeRight = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration, ease: 'easeIn', delay: delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const FadeLeft = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration, ease: 'easeIn', delay: delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
