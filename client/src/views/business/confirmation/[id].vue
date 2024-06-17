<template>
	<div class="w-full p-12 flex flex-col gap-16 items-center">
		<div class="flex flex-col gap-5 items-center">
			<h1 class="text-4xl font-semibold">{{ requestStatusMessage }}</h1>
		</div>
		<div class="w-4 h-4 bg-[#1b1b1b] rounded-full"></div>
		<div class="flex flex-col justify-center items-center text-center self-center relative overflow-hidden">
			<div :class="{ 'code-request-success': requestCodeStatus === 'Success' && requestStatus === 'Idle' }" class="code-input ">
				<input v-model="codeNumbers.number1" @paste="handlePaste" @input="e => checkMaxLength(e.target as HTMLInputElement)" @keyup="e => focusNext('number2', e)" type="number" id="number1" min="1" max="9">
				<input v-model="codeNumbers.number2" @paste="handlePaste" @input="e => checkMaxLength(e.target as HTMLInputElement)" @keyup="e => focusNext('number3', e)" type="number" id="number2" min="1" max="9">
				<input v-model="codeNumbers.number3" @paste="handlePaste" @input="e => checkMaxLength(e.target as HTMLInputElement)" @keyup="e => focusNext('number4', e)" type="number" id="number3" min="1" max="9">
				<input v-model="codeNumbers.number4" @paste="handlePaste" @input="e => checkMaxLength(e.target as HTMLInputElement)" @keyup="e => (e.target! as HTMLInputElement).blur()" type="number" id="number4" min="1" max="9">
			</div>
			<div class="flex flex-col justify-end items-center">
				<LucideIcon :class="{ 'processing-request': requestCodeStatus === 'Loading' || requestStatus === 'Loading' }" class="loader-icon" name="Loader" :size="128" />
				<LucideIcon :class="{ 'success-icon': requestStatus === 'Success' }" class="loader-icon stroke-[#07B889]" name="PartyPopper" :size="128" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { RequestStatus } from '@/enums/EFromValidations';

const router = useRouter();
const { params } = useRoute('/business/confirmation/[id]');

const codeNumbers = ref<{
	number1: number,
	number2: number,
	number3: number,
	number4: number,
}>({
	number1: NaN,
	number2: NaN,
	number3: NaN,
	number4: NaN,
});

const requestCodeStatus = ref<RequestStatus>('Idle');

const requestStatus = ref('Idle');

onMounted(async () => {
	try {
		requestCodeStatus.value = 'Loading';
		const { response, statusCode, data } = await myFetch<{ message: string }>(`business/confirm_account/${params.id}`);
		console.log('response', response.value, 'statusCode', statusCode.value, 'data', data.value);
		
		if (response.value?.ok) 
			requestCodeStatus.value = 'Success';
		// TODO: handle other status codes
		else if (statusCode.value === 409) {
			console.log(data.value?.message);
		} 
	} catch (error) {
		console.error(error);
	}
});	

const requestStatusMessage = computed(() => {
	if ( requestCodeStatus.value === 'Idle' ) 
		return '';
	else if ( requestCodeStatus.value === 'Loading' ) 
		if ( requestStatus.value === 'Loading' ) 
			return 'Confirming Account';
		else
			return 'Getting code...';
	else if ( requestCodeStatus.value === 'Success' ) 
		if ( requestStatus.value === 'Success' ) 
			return 'Account Confirmed';
		else
			return 'Please enter the code sent to your email';
	else if ( requestCodeStatus.value === 'Error' ) 
		return 'Error Confirming Request. Please try again later';
	else if ( requestCodeStatus.value === 'Expired' ) 
		return 'Token Expired';
	else if ( requestCodeStatus.value === 'Forbidden' ) 
		return 'This token has already been used or expired';
	else if ( requestCodeStatus.value === 'Unauthorized' ) 
		return 'Login to verify your account';
	else 
		return '';
});

const handlePaste = (e: ClipboardEvent) => {
	const pastedText = e.clipboardData!.getData('text');
	const numbers = pastedText.split('');

	if (numbers.length === 4) {
		codeNumbers.value = {
			number1: parseInt(numbers[0]),
			number2: parseInt(numbers[1]),
			number3: parseInt(numbers[2]),
			number4: parseInt(numbers[3]),
		}
	}
}

const focusNext = (idElement: string, e: KeyboardEvent) => {
	if (e.key === 'Tab' && e.shiftKey || e.key === 'Tab' || !e.shiftKey && e.key.length > 1)
		return true
	idElement && document.getElementById(idElement)!.focus();	
}

const checkCodeStatus = async () => {
	if (!isNaN(codeNumbers.value.number1) && !isNaN(codeNumbers.value.number2) && !isNaN(codeNumbers.value.number3) && !isNaN(codeNumbers.value.number4)) {
		console.log('codeNumbers', codeNumbers.value);
		
		const code = `${codeNumbers.value.number1}${codeNumbers.value.number2}${codeNumbers.value.number3}${codeNumbers.value.number4}`;
		requestStatus.value = 'Loading';

		const { response, data } = await myFetch<boolean>(`business/confirm_account/${params.id}/${code}`, '', { method: 'PATCH' })
		console.log(data.value);
		codeNumbers.value = { number1: NaN, number2: NaN, number3: NaN, number4: NaN };
		if ( response.value?.ok ) {
			requestStatus.value = 'Success';

			setTimeout( async() => await tostRouterTo(router, '/', {}, 'Account verified!'), 1000)
		} else 
			requestStatus.value = 'Error';
	} else 
		return false;

}

const checkMaxLength = async (el: HTMLInputElement) => {
	const id = el.id as keyof typeof codeNumbers.value;
	if (el.value.length > el.max.length) 
		codeNumbers.value[id] = parseInt(el.value.slice(0, el.max.length))

	await checkCodeStatus();
}
</script>

<style scoped>
.code-input {
	@apply flex gap-10 -translate-y-32 transition-all duration-500 ease-in-out
}
.code-input input {
	@apply 	w-24 h-32 text-5xl text-center border-x-[1rem] border-y-[0.5rem] border-[#1b1b1b]
	;
}

.code-input input::-webkit-inner-spin-button {
	-moz-appearance: textfield;
	-webkit-appearance: none !important;
	appearance: none !important;
	margin: 0;
}

.getting-code {
	@apply -translate-y-32
}

.loader-icon {
    @apply  absolute top-32 opacity-0 transition-all duration-500
			-z-10
}
.processing-request  {
    @apply top-0 opacity-100
    ;
    animation: processing-request-animation 1s ease infinite;
}

.success-icon {
    @apply top-0 opacity-100
    ;
}


@keyframes processing-request-animation {
    0% {
		/* top: 50%;
		left: 50%;
        transform: translate(-50%, -50%) rotate(0deg); */
		transform: rotate(0deg);
    }
    100% {
		/* top: 50%;
		left: 50%;
        transform: translate(-50%, -50%) rotate(90deg); */
		transform: rotate(90deg);
    }
}

.code-request-success {
	@apply translate-y-0
}

</style>