<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang='ts'>
     import { LL } from '$lib/i18n/i18n-svelte';
     import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
</script>
<div class="container h-full mx-auto flex justify-center items-center">
    <h1>{$LL.hi()}</h1>
    <h1>SvelteKit Auth Example</h1>
<p>
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <span
        style="background-image: url('{$page.data.session.user.image}')"
        class="avatar"
      />
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <button on:click={() => signOut()} class="button">Sign out</button>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <button on:click={() => signIn("google")}>Sign In with Google</button>
  {/if}
</p>
</div>
