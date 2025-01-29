<script lang="ts">
	let { data } = $props();
</script>

<ul>
	{#each data.users as user}
		<li>{user.name}</li>
	{/each}
</ul>
