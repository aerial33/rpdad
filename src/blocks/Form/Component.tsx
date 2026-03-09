'use client'

import { ChevronDown, Loader2 } from 'lucide-react'

import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { FormBlock as FormBlockType } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

import { fields } from './fields'

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const { enableIntro, form: formFromProps, introContent, gdprContent, bgColor } = props

  // Handle case where form might be just an ID - in practice it should always be populated
  const formData = typeof formFromProps === 'object' ? formFromProps : null
  if (!formData) {
    console.error('Form data is not populated')
    return null
  }

  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formData

  const formMethods = useForm({
    defaultValues: formData.fields || [],
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [gdprOpen, setGdprOpen] = useState(false)
  const router = useRouter()

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/submit-form`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
              _honeypot: data['_honeypot'] ?? '',
              // _turnstileToken: turnstileToken, // décommenter quand Turnstile actif
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Erreur interne du serveur',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Une erreur est survenue.',
          })
        }
      }

      submitForm().catch((error) => {
        console.error('Erreur lors de la soumission du formulaire:', error)
        setIsLoading(false)
        setError({
          message: 'Une erreur est survenue lors de la soumission.',
        })
      })
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="relative py-20">
      <BackgroundSection className={bgColor || 'bg-neutrcal-100'} />
      <div className="container px-4 xl:flex xl:justify-between xl:gap-8 xl:px-0">
        <div className="mb-16 text-left xl:max-w-3xl">
          {enableIntro && introContent && !hasSubmitted && (
            <RichText
              className="richtext-content mb-8 lg:mb-12"
              data={introContent}
              enableGutter={false}
            />
          )}
        </div>
        <div className="border-muted-foreground mx-auto w-full max-w-3xl rounded-[0.8rem] border-b bg-white p-4 shadow-sm">
          <FormProvider {...formMethods}>
            {!isLoading &&
              hasSubmitted &&
              confirmationType === 'message' &&
              confirmationMessage && (
                <RichText
                  className="richtext-content [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:md:w-max [&_p]:text-xs"
                  data={confirmationMessage}
                />
              )}
            {isLoading && !hasSubmitted && <p>Chargement, veuillez patienter...</p>}
            {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
            {!hasSubmitted && (
              <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 last:mb-0">
                  {formData &&
                    formData.fields &&
                    formData.fields?.map((field, index) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (Field) {
                        return (
                          <div className="mb-6 last:mb-0" key={index}>
                            <Field
                              form={formData}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                        )
                      }
                      return null
                    })}
                </div>

                {/* Honeypot — caché visuellement, ignoré des humains, piège pour bots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                    overflow: 'hidden',
                  }}
                >
                  <input
                    autoComplete="off"
                    tabIndex={-1}
                    type="text"
                    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(register as any)('_honeypot')}
                  />
                </div>

                {/* Slot Turnstile — décommenter quand NEXT_PUBLIC_TURNSTILE_SITE_KEY est défini */}
                {/* <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} onSuccess={setTurnstileToken} /> */}

                <Button disabled={isLoading} form={String(formID)} type="submit" variant="default">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {submitButtonLabel}
                </Button>
              </form>
            )}
            {gdprContent && (
              <div className="text-muted-foreground mt-4 text-right text-xs">
                <button
                  type="button"
                  onClick={() => setGdprOpen((v) => !v)}
                  className="flex w-full items-center justify-end gap-1"
                >
                  Protection de vos données
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${gdprOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${gdprOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <RichText
                    className="mt-2 text-left"
                    data={gdprContent}
                    enableGutter={false}
                    enableProse={false}
                  />
                </div>
              </div>
            )}
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
