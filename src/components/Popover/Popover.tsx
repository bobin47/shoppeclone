import React, { useRef, useState } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset, type Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  isOpen?: boolean
  placement?: Placement
}

export default function Popover({ children, className, renderPopover, isOpen, placement }: Props) {
  const [open, setOpen] = useState(isOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, strategy, refs, reference, middlewareData } = useFloating({
    middleware: [offset(4), shift(), arrow({ element: arrowRef })],
    placement: placement
  })

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <div className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content'
              }}
            >
              <span
                ref={arrowRef}
                className='absolute translate-y-[-99%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
