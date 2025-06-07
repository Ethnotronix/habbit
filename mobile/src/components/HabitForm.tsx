import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Habit, syncFromCloud, syncToCloud, getPeriodStart } from '../storage';
import { useAuth } from '../AuthProvider';
import { useNavigation } from '@react-navigation/native';

export default function HabitForm({ habitId }: { habitId?: number }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3498db');
  const [target, setTarget] = useState(1);
  const [frequency, setFrequency] = useState<Habit['frequency']>('daily');

  useEffect(() => {
    async function load() {
      if (!user) return;
      if (habitId) {
        const habits = await syncFromCloud(user);
        const h = habits.find(x => x.id === habitId);
        if (h) {
          setHabit(h);
          setName(h.name);
          setColor(h.color);
          setTarget(h.target);
          setFrequency(h.frequency);
        }
      }
    }
    void load();
  }, [habitId, user]);

  const save = async () => {
    if (!user) return;
    const habits = await syncFromCloud(user);
    if (habit) {
      const h = habits.find(h => h.id === habit.id);
      if (h) {
        h.name = name;
        h.color = color;
        h.target = target;
        h.frequency = frequency;
      }
    } else {
      habits.push({
        id: Date.now(),
        name,
        color,
        target,
        frequency,
        count: 0,
        lastReset: getPeriodStart(Date.now(), frequency),
      });
    }
    await syncToCloud(user, habits);
    navigation.goBack();
  };

  const deleteHabit = async () => {
    if (!habit || !user) return;
    const habits = (await syncFromCloud(user)).filter(h => h.id !== habit.id);
    await syncToCloud(user, habits);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Color" value={color} onChangeText={setColor} style={styles.input} />
      <TextInput
        placeholder="Target"
        value={String(target)}
        onChangeText={t => setTarget(Number(t))}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Frequency (daily, weekly, monthly)"
        value={frequency}
        onChangeText={t => setFrequency(t as Habit['frequency'])}
        style={styles.input}
      />
      <Button title="Save" onPress={save} />
      {habit && <Button title="Delete" onPress={deleteHabit} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
});
