import { Threshold } from '@/utils/AST'
import { Input } from '@chakra-ui/react'
import React from 'react'

const DateInput = ({ast}:{ast:any}) => {
  return (
    <Input type="time" width={32} size='sm' onChange={(e) => {ast.addSubTree(ast.lhs, new Threshold(e.target.value))}}/>
  )
}

export default DateInput