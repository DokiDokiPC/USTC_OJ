<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";

// 定义获取的数据类型
type UserType = {
  username: string;
  solved: number;
};
type DataType = {
  page_size: number;
  total: number;
  users: UserType[];
};
const users = ref<UserType[]>();

// 分页信息
const total = ref(0);
const page_size = ref(0);
const total_page = computed((): number => {
  if (page_size.value === 0) return 0;
  else return Math.ceil(total.value / page_size.value);
});
const page = ref(1);

// 获取数据
const users_url = new URL(import.meta.env.VITE_BACKEND_URL + "users/");
async function get_users(offset: number) {
  // 从后端获取数据
  users_url.searchParams.set("offset", offset.toString());
  const resp = await fetch(users_url, { credentials: "include" });

  if (resp.status === 200) {
    // 解析数据
    const data: DataType = await resp.json();
    page_size.value = data.page_size;
    total.value = data.total;
    users.value = data.users;
  }
}

// 监测页数改变, 重新从服务器获取数据
watch(page, async (new_page: number) => {
  await get_users((new_page - 1) * page_size.value);
});

// 初始化时, 获取第一页数据
onMounted(async () => {
  await get_users(0);
});
</script>

<template>
  <v-container>
    <v-card>
      <!-- 添加v-if="users", 否则先显示headers, 等一会儿才显示数据, 破坏了整体性 -->
      <v-card-text v-if="users">
        <!-- user排行榜 -->
        <v-table>
          <thead>
            <tr>
              <th class="text-center">Username</th>
              <th class="text-center">Solved</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.username">
              <td class="text-center">{{ user.username }}</td>
              <td class="text-center">{{ user.solved }}</td>
            </tr>
          </tbody>
        </v-table>

        <!-- 分页 -->
        <v-container style="padding: 0">
          <v-pagination v-model="page" :length="total_page" />
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>
