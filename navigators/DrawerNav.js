import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import BottomNav from './BottomNav'
import WeelStack from './WeelStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyDrawer from '../component/MyDrawer';
import MyGroups from '../pages/GoSchedule/Screen/groups/MyGroups';
import CreateTask from '../pages/GoSchedule/Screen/groups/CreateTask';
import GroupDetails from '../pages/GoSchedule/Screen/groups/GroupDetails';
import TaskAllComments from '../pages/GoSchedule/Screen/groups/TaskAllComments';
import MembersList from '../pages/GoSchedule/Screen/groups/MembersList';
import EditTask from '../pages/GoSchedule/Screen/groups/EditTask';
import Notifications from '../pages/GoSchedule/notifications/Notifications';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { dimensions } from '../utility/Mycolors';
import Routine from '../pages/GoSchedule/Screen/routine/Routine';
import TaskDetails from '../pages/GoSchedule/Screen/groups/TaskDetails';
import ConnectPeopleStack from './ConnectPeopleStack';
import CreateRoutine from '../pages/GoSchedule/Screen/routine/CreateRoutine';
import CreationFashion from './CreationFashion';
import BottomNaviator from './BottomNavigator';
import SharedRoutines from '../pages/GoSchedule/Screen/routine/SharedRoutine';
import CreateRoutineDetails from '../pages/GoSchedule/Screen/routine/CreateRoutineDetails';
import RoutineAllComments from '../pages/GoSchedule/Screen/routine/RoutineAllComments';
import RoutineDetails from '../pages/GoSchedule/Screen/routine/RoutineDetails';
import SharedGroups from '../pages/GoSchedule/Screen/groups/SharedGroups';
import EditRoutine from '../pages/GoSchedule/Screen/routine/EditRoutine';
import AddSubbCommentRoutineModal from '../pages/GoSchedule/Screen/groups/AddSubbCommentRoutineModal';
import MyTask from '../pages/GoSchedule/Screen/groups/MyTask';
import MyTaskTab from '../pages/GoSchedule/Screen/groups/MyTaskTab';
import CreateNotes from '../pages/GoSchedule/Screen/notes/CreateNotes';
import NotesDetails from '../pages/GoSchedule/Screen/notes/NotesDetails';
import NotesAllComments from '../pages/GoSchedule/Screen/notes/NotesAllComments';
import SharedRoutineDetails from '../pages/GoSchedule/Screen/routine/SharedRoutineDetails';
import EditNotes from '../pages/GoSchedule/Screen/notes/EditNotes';
import ExpenseManagement from '../pages/GoExpense/ExpenseManagment/ExpenseManagement';
const DrawerNav = (props) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      headerMode={null}
      screenOptions={{ headerShown: false, drawerWidth: dimensions.SCREEN_WIDTH }}
      drawerWidth={dimensions.SCREEN_WIDTH}
      drawerContent={(props) => <MyDrawer {...props} />}
    >
      {/* <Drawer.Screen name="BottomNav" component={BottomNav}  */}
      {/* <Drawer.Screen name="CreationFashion" component={CreationFashion}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      /> */}

      {/* this should be uncommented for GoAccounting insted of weelstack  28/11/2023*/}
      {/* <Drawer.Screen name="BottomNaviator" component={BottomNaviator} /> */}



      {/* <Drawer.Screen name="BottomNav" component={BottomNav} /> */}
      <Drawer.Screen name="WeelStack" component={WeelStack} />
      {/* BottomNav */}
      <Drawer.Screen name="MyGroups" component={MyGroups}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="GroupDetails" component={GroupDetails}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="CreateTask" component={CreateTask}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="TaskAllComments" component={TaskAllComments}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="TaskDetails" component={TaskDetails}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="EditTask" component={EditTask}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="MembersList" component={MembersList}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="Notifications" component={Notifications}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="Routine" component={Routine}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="CreateRoutine" component={CreateRoutine}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="SharedRoutines" component={SharedRoutines}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="CreateRoutineDetails" component={CreateRoutineDetails}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="RoutineDetails" component={RoutineDetails}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="RoutineAllComments" component={RoutineAllComments}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="EditRoutine" component={EditRoutine}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="AddSubbCommentRoutineModal" component={AddSubbCommentRoutineModal}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="SharedGroups" component={SharedGroups}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="MyTask" component={MyTask}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="MyTaskTab" component={MyTaskTab}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="CreateNotes" component={CreateNotes}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="NotesDetails" component={NotesDetails}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="NotesAllComments" component={NotesAllComments}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="SharedRoutineDetails" component={SharedRoutineDetails}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="EditNotes" component={EditNotes}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
      <Drawer.Screen name="ExpenseManagement" component={ExpenseManagement}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
      />
    </Drawer.Navigator>
  );
}


export default DrawerNav
