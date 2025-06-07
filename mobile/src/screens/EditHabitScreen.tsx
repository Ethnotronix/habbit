import React from 'react';
import HabitForm from '../components/HabitForm';
import { useRoute } from '@react-navigation/native';

export default function EditHabitScreen() {
  const route = useRoute<any>();
  const id = route.params?.id as number | undefined;
  return <HabitForm habitId={id} />;
}
