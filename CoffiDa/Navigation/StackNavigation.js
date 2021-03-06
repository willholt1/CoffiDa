import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import styles from '../Style/Styles'

import HomeScreen from '../Components/HomeScreen'
import Location from '../Components/Location'
import ReviewsList from '../Components/ReviewsList'
import AddReview from '../Components/AddReview'
import SingleReview from '../Components/SingleReview'
import FavouriteLocations from '../Components/FavouriteLocations'

import AccountInfo from '../Components/AccountInfo'
import UpdateInfo from '../Components/UpdateInfo'

import LikedReviews from '../Components/LikedReviews'
import EditReview from '../Components/EditReview'
import MyReviews from '../Components/MyReviews'

import Login from '../Components/LogIn'
import Signup from '../Components/SignUp'
import LogOut from '../Components/LogOut'

const Stack = createStackNavigator()

const MainStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name='Location' component={Location} />
      <Stack.Screen name='ReviewsList' component={ReviewsList} options={{ title: 'Reviews' }} />
      <Stack.Screen name='AddReview' component={AddReview} options={{ title: 'Add Review' }} />
      <Stack.Screen name='SingleReview' component={SingleReview} options={{ title: 'Review' }} />
    </Stack.Navigator>
  );
}

const AccountStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='AccountInformation' component={AccountInfo} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          ),
          title: 'Account Information'
        }}
      />
      <Stack.Screen name='UpdateInfo' component={UpdateInfo} options={{ title: 'Update Information' }} />
    </Stack.Navigator>
  );
}

const FavouriteLocationsStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='FavouriteLocations' component={FavouriteLocations} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          ),
          title: 'Favourite Locations'
        }}
      />
      <Stack.Screen name='Location' component={Location} />
      <Stack.Screen name='ReviewsList' component={ReviewsList} options={{ title: 'Reviews' }} />
      <Stack.Screen name='AddReview' component={AddReview} options={{ title: 'Add Review' }} />
      <Stack.Screen name='SingleReview' component={SingleReview} options={{ title: 'Review' }} />
    </Stack.Navigator>
  );
}

const LikedReviewsStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LikedReviews' component={LikedReviews} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          ),
          title: 'Liked Reviews'
        }}
      />
      <Stack.Screen name='SingleReview' component={SingleReview} options={{ title: 'Review' }} />
    </Stack.Navigator>
  )
}

const MyReviewsStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MyReviews' component={MyReviews} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          ),
          title: 'My Reviews'
        }}
      />
      <Stack.Screen name='SingleReview' component={SingleReview} options={{ title: 'Single Review' }} />
      <Stack.Screen name='EditReview' component={EditReview} options={{ title: 'Edit Review' }} />
    </Stack.Navigator>
  )
}

const LoginStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login' component={Login} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack.Navigator>
  )
}

const SignUpStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SignUp' component={Signup} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack.Navigator>
  )
}

const LogOutStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LogOut' component={LogOut} options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.drawerButtonText}>+</Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack.Navigator>
  )
}

export { MainStack, AccountStack, FavouriteLocationsStack, LikedReviewsStack, MyReviewsStack, LoginStack, SignUpStack, LogOutStack }
