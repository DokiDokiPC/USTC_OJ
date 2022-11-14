<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import router from "../../router";
import { useMainTabStore } from "../../store";

// 定义了problem类型, problems用以存储获取的数据
type ProblemBrief = {
  id: number;
  name: string;
  level: string;
  ac_num: number;
  submit_num: number;
  ac_rate: string; // 通过ac_num和submit_num计算, 后面要加%号
};
type DataBrief = {
  page_size: number;
  total_count: number;
  problems: ProblemBrief[];
};
const column_keys: (keyof ProblemBrief)[] = [
  "id",
  "name",
  "level",
  "ac_num",
  "submit_num",
  "ac_rate",
];
const column_names = ["#", "Title", "Level", "AC", "Total", "AC Rate"]; // 每个属性显示的名称
const problems = ref<ProblemBrief[]>();

// 分页信息
const total_count = ref(0);
const page_size = ref(0);
const total_page = computed((): number => {
  if (page_size.value === 0) return 0;
  else return Math.ceil(total_count.value / page_size.value);
});
const page = ref(1);

// 获取数据
const problems_url = new URL(import.meta.env.VITE_BACKEND_URL + "problems/");
async function get_problems(offset: number) {
  problems_url.searchParams.set("offset", offset.toString());
  const resp = await fetch(problems_url, { credentials: "include" });
  if (resp.status === 200) {
    const data: DataBrief = await resp.json();
    page_size.value = data.page_size;
    total_count.value = data.total_count;
    for (const problem of data.problems) {
      if (problem.submit_num === 0) problem.ac_rate = "-";
      else
        problem.ac_rate =
          (
            Math.round((10000 * problem.ac_num) / problem.submit_num) / 100
          ).toString() + "%";
    }
    problems.value = data.problems;
  }
}

// 监测页数改变, 重新从服务器获取数据
watch(page, async (new_page: number) => {
  await get_problems((new_page - 1) * page_size.value);
});

// table行被点击进入problem详情页面
const main_tab_store = useMainTabStore();
function row_clicked(problem_id: number) {
  main_tab_store.main_tab = -1;
  router.push({ name: "problem-detail", params: { id: problem_id } });
}

// 初始化时, 获取第一页数据
onMounted(async () => {
  await get_problems(0);
});

// 不同的难度用不同的颜色显示
function level_color(level: string): {} {
  switch (level) {
    case "Easy":
      return { color: "SeaGreen" };
    case "Middle":
      return { color: "Orange" };
    case "Hard":
      return { color: "OrangeRed" };
    default:
      return {};
  }
}
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
              <td
                v-for="key in column_keys"
                :key="key"
                class="text-center"
                :style="key == 'level' ? level_color(problem[key]) : {}"
              >
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
