import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../AuthProvider';
import { Habit, syncFromCloud, syncToCloud, resetIfNeeded } from '../storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    async function init() {
      if (!user) return;
      const h = await syncFromCloud(user);
      h.forEach(resetIfNeeded);
      await syncToCloud(user, h);
      setHabits([...h]);
    }
    void init();
  }, [user]);

  const update = async (id: number, delta: number) => {
    if (!user) return;
    const h = [...habits];
    const habit = h.find(x => x.id === id);
    if (!habit) return;
    resetIfNeeded(habit);
    habit.count = Math.max(0, Math.min(habit.target, habit.count + delta));
    await syncToCloud(user, h);
    setHabits([...h]);
  };

  const renderItem = ({ item }: { item: Habit }) => (
    <View style={[styles.item, { backgroundColor: item.color }]}>

      <Text style={styles.text}>{item.name} ({item.count}/{item.target})</Text>
      <View style={styles.row}>
        <Button title="-" onPress={() => update(item.id, -1)} />
        <Button title="+" onPress={() => update(item.id, 1)} />
        <Button title="Edit" onPress={() => navigation.navigate('Edit' as never, { id: item.id } as never)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No habits</Text>}
      />
      <Button title="Add Habit" onPress={() => navigation.navigate('Add' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 12, borderRadius: 8, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  text: { color: 'white' },
});
