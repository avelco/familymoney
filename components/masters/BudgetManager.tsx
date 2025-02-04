"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addBudget } from "../actions"
import type { Budget, Category } from "../types"

interface BudgetManagerProps {
  budgets: Budget[]
  categories: Category[]
}

export default function BudgetManager({ budgets, categories }: BudgetManagerProps) {
  const [categoryId, setCategoryId] = useState("")
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addBudget({
      categoryId,
      amount: Number.parseFloat(amount),
      period,
    })
    setCategoryId("")
    setAmount("")
    setPeriod("monthly")
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Budgets</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((c) => c.type === "expense")
                .map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Budget Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
          <Select value={period} onValueChange={(value) => setPeriod(value as "monthly" | "yearly")}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Add Budget
          </Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Existing Budgets:</h3>
          <ul className="list-disc list-inside">
            {budgets.map((budget) => {
              const category = categories.find((c) => c.id === budget.categoryId)
              return (
                <li key={budget.id}>
                  {category?.name}: ${budget.amount} ({budget.period})
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

