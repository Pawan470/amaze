'use client'
import React, { useState, useEffect } from 'react'
import DarkTheme from './_components/DarkTheme'
import SubmitBtn from '@/components/shared/SubmitBtn'
import Input from '@/components/Forms/Input'
import Select from '@/components/Forms/Select'

export default function Practice() {
  const [form, setForm] = useState({
    first: 'one',
    middle: '2',
    last: '3',
  })
  const [form1, set1Form] = useState('okoko')
  const [form2, set2Form] = useState('okoko')
  const [form3, set3Form] = useState('okoko')
  const [form4, set4Form] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((pre) => ({ ...pre, [name]: value }))
  }

  useEffect(() => {
    let interval
    if (form4) {
      interval = setTimeout(() => {
        set4Form(false)
      }, 2000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [form4])

  console.log('renderred')
  const reset = () => {
    setForm({
      first: '',
      middle: '',
      last: '',
    })
    set4Form(true)
  }
  const register = (name) => {
    return {
      name,
      value: form[name],
      className: 'form-control mt-2',
      onChange: handleChange,
    }
  }

  return (
    <div>
      {/* <DarkTheme /> */}
      <button className=" custom_btn">Hi</button>
      <div className="nested_css">
        <ul>
          <li>HI</li>
          <li>HI</li>
          <li>HI</li>
          <li>HI</li>
        </ul>
      </div>

      <div>
        <input {...register('first')} disabled />
        <input {...register('middle')} disabled />
        <Input {...register('last')} placeholder="Pawan bhatt" />
        <Select></Select>
        <SubmitBtn isLoading={form4} handleSubmit={reset}>
          ok
        </SubmitBtn>
      </div>
    </div>
  )
}
