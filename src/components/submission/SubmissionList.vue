<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useMainTabStore } from "../../store";

// 点击username和problem的链接时, 先通过main_tab_store将导航栏的选择置空
const main_tab_store = useMainTabStore();

// 定义了submission类型, submissions用以存储获取的数据
type SubmissionObj = {
  id: number;
  submission_time: string;
  username: string;
  problem_id: number;
  compiler: string;
  status: string;
  time_cost: number;
  memory_cost: number;
};
const column_names = [
  "#",
  "Submission Time",
  "Username",
  "Problem ID",
  "Compiler",
  "Status",
  "Time Used",
  "Memory Used",
];
const submissions = ref<SubmissionObj[]>();

// 分页信息
const total = ref(0);
const page_size = ref(0);
const total_page = computed((): number => {
  if (page_size.value === 0) return 0;
  else return Math.ceil(total.value / page_size.value);
});
const page = ref(1);

// 获取数据
const submissions_url = new URL(
  import.meta.env.VITE_BACKEND_URL + "submissions/"
);

const compilers_map = new Map([["GPP", "G++"]]);

async function get_submissions(offset: number) {
  submissions_url.searchParams.set("offset", offset.toString());
  // 检查url中有无username的query, 如果有, 也要传到后端
  const url_queries = new URLSearchParams(window.location.search);
  const username = url_queries.get("username");
  if (username != null) submissions_url.searchParams.set("username", username);

  const resp = await fetch(submissions_url, { credentials: "include" });

  if (resp.status === 200) {
    const data = await resp.json();

    page_size.value = data.page_size;
    total.value = data.total;

    for (const submission of data.submissions) {
      // 将时间更改为当地时间
      submission.submission_time = new Date(
        submission.submission_time
      ).toLocaleString();

      // 将编译器名称更改为要显示的名称
      const temp = compilers_map.get(submission.compiler);
      if (temp != null) submission.compiler = temp;

      // 给time_cost, memory_cost加上单位, 如果为-1, 改成-
      if (submission.time_cost >= 0)
        submission.time_cost = submission.time_cost.toString() + "ms";
      else submission.time_cost = "-";
      if (submission.memory_cost >= 0)
        submission.memory_cost = submission.memory_cost.toString() + "KB";
      else submission.memory_cost = "-";
    }
    submissions.value = data.submissions;
  }
}

// 监测页数改变, 重新从服务器获取数据
watch(page, async (new_page: number) => {
  await get_submissions((new_page - 1) * page_size.value);
});

// 不同status用不同颜色显示
function status_color(status: string): {} {
  switch (status) {
    case "CompileError":
    case "RuntimeError":
    case "MemoryLimitExceeded":
    case "TimeLimitExceeded":
    case "WrongAnswer":
      return { color: "Red" };
    case "Accepted":
      return { color: "LimeGreen" };
    default:
      return {};
  }
}

// 初始化时, 获取第一页数据
onMounted(async () => {
  await get_submissions(0);
});
</script>

<template>
  <v-container fluid style="padding-left: 6vw; padding-right: 6vw">
    <v-card>
      <!-- 添加v-if="submissions", 否则先显示headers, 等一会儿才显示数据, 破坏了整体性 -->
      <v-card-text v-if="submissions">
        <!-- submission列表 -->
        <v-table>
          <thead>
            <tr>
              <th v-for="name in column_names" :key="name" class="text-center">
                {{ name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="submission in submissions" :key="submission.id">
              <td class="text-center">{{ submission.id }}</td>
              <td class="text-center">{{ submission.submission_time }}</td>
              <td class="text-center">
                <router-link
                  :to="{
                    name: 'user-detail',
                    params: { username: submission.username },
                  }"
                  @click="main_tab_store.main_tab = -1"
                >
                  {{ submission.username }}
                </router-link>
              </td>
              <td class="text-center">
                <router-link
                  :to="{
                    name: 'problem-detail',
                    params: { id: submission.problem_id },
                  }"
                  @click="main_tab_store.main_tab = -1"
                >
                  {{ submission.problem_id }}
                </router-link>
              </td>
              <td class="text-center">{{ submission.compiler }}</td>
              <td class="text-center" :style="status_color(submission.status)">
                {{ submission.status }}
              </td>
              <td class="text-center">{{ submission.time_cost }}</td>
              <td class="text-center">{{ submission.memory_cost }}</td>
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
