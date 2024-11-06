"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartPie } from "@/components/chartPie";
import { BarChart, ComparisonChart } from "@/components/barChart";
import { CurrencyDisplay } from "@/components/currency-format";

export default function Page() {
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [yourCash, setYourCash] = useState();
  function loadTotalIncome() {
    fetch("https://expense-tracker-service.vercel.app/totalIncome")
      .then((res) => res.json())
      .then((data) => {
        setTotalIncome(data.sum);
      });
  }

  function loadTotalExpense() {
    fetch("https://expense-tracker-service.vercel.app/totalExpense")
      .then((res) => res.json())
      .then((data) => {
        setTotalExpense(data.sum);
      });
  }

  useEffect(() => {
    loadTotalIncome(), loadTotalExpense();
  }, []);

  useEffect(() => {
    if (totalIncome !== undefined && totalExpense !== undefined && totalIncome>totalExpense) {
      setYourCash(totalIncome - totalExpense);
    }
  }, [totalIncome, totalExpense]);
  return (
    <div className="px-[5%] bg-slate-200 h-screen pt-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="bg-blue-600">
        <p className="p-4">Your Cash</p>
          <CardHeader>
          <CardTitle>
          <CurrencyDisplay amount={yourCash} />
          </CardTitle>
          </CardHeader>
          <CardFooter>
           
          </CardFooter>
         
        </Card>
        <Card>
          <p className="p-4">Total Income</p>
          <hr />
          <CardHeader>
            <CardTitle>
            <CurrencyDisplay amount={totalIncome} />
            </CardTitle>

            <CardDescription>Your Income Amount</CardDescription>
          </CardHeader>
          {/* <CardFooter>
                        <p>32% from last month</p>
                    </CardFooter> */}
        </Card>
        <Card>
          <p className="p-4">Total Expense</p>
          <hr />
          <CardHeader>
            <CardTitle>
            <CurrencyDisplay amount={totalExpense} />
            </CardTitle>
            <CardDescription>Your Expense Amount</CardDescription>
          </CardHeader>
          {/* <CardFooter>
                        <p>32% from last month</p>
                    </CardFooter> */}
        </Card>
      </div>
      <ChartPie totalExpense={totalExpense} />
    </div>
  );
}
