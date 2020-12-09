<template>
	<mm_page id="page_table">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>表格</span>
									<span class="fr">&lt; 返回</span></router-link>
								</h3>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</header>
		<main>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view>
								<mm_btn class="btn_info" @click.native="small = !small">切换大小</mm_btn>
								<mm_btn class="btn_info" @click.native="invert = !invert">反色</mm_btn>
							</mm_view>
						</mm_col>
						<mm_col width="100">
							<mm_card>
								<div class="card_head">样式一</div>
								<div class="card_body">
									<mm_table type="1" :class="{'table-sm': small, 'invert': invert }">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">First</th>
												<th scope="col">Last</th>
												<th scope="col">Handle</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row">1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
											<tr>
												<th scope="row">2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
											</tr>
											<tr>
												<th scope="row">3</th>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
											</tr>
										</tbody>
									</mm_table>
								</div>
							</mm_card>
						</mm_col>
						<mm_col width="100">
							<mm_card>
								<div class="card_head">样式二</div>
								<div class="card_body">
									<mm_table type="2" :class="{'table-sm': small, 'invert': invert }">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">First</th>
												<th scope="col">Last</th>
												<th scope="col">Handle</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row">1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
											<tr>
												<th scope="row">2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
											</tr>
											<tr>
												<th scope="row">3</th>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
											</tr>
										</tbody>
									</mm_table>
								</div>
							</mm_card>
						</mm_col>
						<mm_col width="100">
							<mm_card>
								<div class="card_head">样式三</div>
								<div class="card_body">
									<mm_table type="3" :class="{'table-sm': small, 'invert': invert }">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">First</th>
												<th scope="col">Last</th>
												<th scope="col">Handle</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row">1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
											<tr>
												<th scope="row">2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
											</tr>
											<tr>
												<th scope="row">3</th>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
											</tr>
										</tbody>
									</mm_table>
								</div>
							</mm_card>
						</mm_col>
						<mm_col width="100">
							<mm_card>
								<div class="card_head">样式四</div>
								<div class="card_body">
									<mm_table type="4" :class="{'table-sm': small, 'invert': invert }">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">First</th>
												<th scope="col">Last</th>
												<th scope="col">Handle</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row">1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
											<tr>
												<th scope="row">2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
											</tr>
											<tr>
												<th scope="row">3</th>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
											</tr>
										</tbody>
									</mm_table>
								</div>
							</mm_card>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				small: false,
				invert: false
			}
		}
	}
</script>

<style>
</style>
