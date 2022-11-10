<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useUrlStore } from "../../store";
import router from "../../router";

// 定义了problem类型, problems用以存储获取的数据
type ProblemObj = {
  id: number;
  name: string;
  level: string;
  ac_num: number;
  submit_num: number;
};
const column_keys: (keyof ProblemObj)[] = [
  "id",
  "name",
  "level",
  "ac_num",
  "submit_num",
];
const column_names = ["#", "Title", "Level", "AC", "Total"]; // 每个属性显示的名称
const problems = ref<ProblemObj[]>();

// 分页信息
const total_count = ref(0);
const page_size = ref(0);
const total_page = computed((): number => {
  if (page_size.value === 0) return 0;
  else return Math.ceil(total_count.value / page_size.value);
});
const page = ref(1);

// 获取数据
const problems_url = useUrlStore().problems_url; // 获取problems所用的url
async function get_problems(offset: number) {
  problems_url.searchParams.set("offset", offset.toString());
  const resp = await fetch(problems_url, { credentials: "include" });
  if (resp.status === 200) {
    const data = await resp.json();
    page_size.value = data.page_size;
    total_count.value = data.total_count;
    problems.value = data.problems;
  }
}

// 监测页数改变, 重新从服务器获取数据
watch(page, async (new_page: number) => {
  await get_problems((new_page - 1) * page_size.value);
});

// table行被点击进入problem详情页面
function row_clicked(problem_id: number) {
  router.push({ name: "problem-detail", params: { id: problem_id } });
}

// 初始化时, 获取第一页数据
onMounted(async () => {
  await get_problems(0);
});
</script>

<template>
  <v-container>
    <v-card>
      <!-- 添加v-if="problems", 否则先显示headers, 等一会儿才显示数据, 破坏了整体性 -->
      <v-card-text v-if="problems">
        <!-- problem列表 -->
        <v-table>
          <thead>
            <tr>
              <th v-for="name in column_names" :key="name" class="text-center">
                {{ name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="problem in problems"
              :key="problem.id"
              @dblclick="row_clicked(problem.id)"
            >
              <td v-for="key in column_keys" :key="key" class="text-center">
                {{ problem[key] }}
              </td>
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
