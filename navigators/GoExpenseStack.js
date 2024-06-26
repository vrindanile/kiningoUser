import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExpenseManagement from '../pages/GoExpense/ExpenseManagment/ExpenseManagement';
import AddExpansesButton from '../pages/GoExpense/ExpenseManagment/AddExpansesButton';
import AddBudgetary from '../pages/GoExpense/ExpenseManagment/AddBudgetary';
import AddedBudgetary from '../pages/GoExpense/ExpenseManagment/AddedBudgetary';
import EditBudgetary from '../pages/GoExpense/ExpenseManagment/EditBudgetary';
import AddExpense from '../pages/GoExpense/ExpenseManagment/AddExpense';
import ViewExpanses from '../pages/GoExpense/ExpenseManagment/ViewExpanses';
import AllExpensesTab from '../pages/GoExpense/ExpenseManagment/AllExpensesTab';
import EditExpanse from '../pages/GoExpense/ExpenseManagment/EditExpanse';
import AllExpenses from '../pages/GoExpense/ExpenseManagment/AllExpenses';
import AddedSplit from '../pages/GoExpense/Split/AddedSplit';
import AddSplit from '../pages/GoExpense/Split/AddSplit';
import SplitDetail from '../pages/GoExpense/Split/SplitDetail';
import AddSplitBill from '../pages/GoExpense/Split/AddSplitBill';
import SplitBillUsers from '../pages/GoExpense/Split/SplitBillUsers';
import SplitList from '../pages/GoExpense/Split/SplitList';
import SplitDetailViewMore from '../pages/GoExpense/Split/SplitDetailViewMore';
import SettleSplitGroup from '../pages/GoExpense/Split/SettleSplitGroup';
import SettleSplitBill from '../pages/GoExpense/Split/SettleSplitBill';
import NotificationExpanse from '../pages/GoExpense/notification/NotificationExpanse';
// import InventionNotifications from '../pages/Creation/InventionCreation/InventionNotifications';
const GoExpenseStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}>
            <Stack.Screen component={ExpenseManagement} name="ExpenseManagement" />
            <Stack.Screen component={AddExpansesButton} name="AddExpansesButton" />
            <Stack.Screen component={AddBudgetary} name="AddBudgetary" />
            <Stack.Screen component={AddedBudgetary} name="AddedBudgetary" />
            <Stack.Screen component={EditBudgetary} name="EditBudgetary" />
            <Stack.Screen component={ViewExpanses} name="ViewExpanses" />
            <Stack.Screen component={AllExpensesTab} name="AllExpensesTab" />
            <Stack.Screen component={EditExpanse} name="EditExpanse" />
            <Stack.Screen component={AllExpenses} name="AllExpenses" />
            <Stack.Screen component={AddedSplit} name="AddedSplit" />
            <Stack.Screen component={AddSplit} name="AddSplit" />
            <Stack.Screen component={SplitDetail} name="SplitDetail" />
            <Stack.Screen component={AddSplitBill} name="AddSplitBill" />
            <Stack.Screen component={SplitBillUsers} name="SplitBillUsers" />
            <Stack.Screen component={SplitList} name="SplitList" />
            <Stack.Screen component={SplitDetailViewMore} name="SplitDetailViewMore" />
            <Stack.Screen component={SettleSplitGroup} name="SettleSplitGroup" />
            <Stack.Screen component={SettleSplitBill} name="SettleSplitBill" />
            <Stack.Screen component={AddExpense} name="AddExpense" />
            <Stack.Screen component={NotificationExpanse} name="NotificationExpanse" />
            {/* AllExpenses */}
        </Stack.Navigator>

    )
}




export default GoExpenseStack